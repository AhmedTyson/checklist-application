/**
 * CourseStore.js
 * Shared module for managing courses in localStorage.
 * Each course has: id, title, icon, color, description, content (stages), createdAt
 */

const COURSES_KEY = "roadmapCourses";
const BUILTIN_JS_ID = "javascript";
const BUILTIN_OVERRIDES_KEY = "builtinOverrides";

// --- Built-in JS Course Metadata ---
function getBuiltinJSMeta() {
  return {
    id: BUILTIN_JS_ID,
    title: "JavaScript",
    icon: "javascript",
    color: "#a855f7",
    description:
      "Complete JavaScript mastery — from basics to senior-level patterns.",
    builtin: true,
    createdAt: "2026-01-01",
  };
}

// --- Course CRUD ---

function getBuiltinWithOverrides() {
  const base = getBuiltinJSMeta();
  try {
    const overrides =
      JSON.parse(localStorage.getItem(BUILTIN_OVERRIDES_KEY)) || {};
    return { ...base, ...overrides, id: BUILTIN_JS_ID, builtin: true };
  } catch {
    return base;
  }
}

export function getCourses() {
  const custom = loadCustomCourses();
  return [getBuiltinWithOverrides(), ...custom];
}

export function getCourse(id) {
  if (id === BUILTIN_JS_ID) return getBuiltinWithOverrides();
  const courses = loadCustomCourses();
  return courses.find((c) => c.id === id) || null;
}

export function saveCourse(course) {
  if (course.id === BUILTIN_JS_ID) {
    // Save overrides for built-in course
    const { id, builtin, createdAt, ...overrides } = course;
    localStorage.setItem(BUILTIN_OVERRIDES_KEY, JSON.stringify(overrides));
    return;
  }
  const courses = loadCustomCourses();
  const idx = courses.findIndex((c) => c.id === course.id);
  if (idx >= 0) {
    courses[idx] = { ...courses[idx], ...course };
  } else {
    courses.push(course);
  }
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}

export function deleteCourse(id) {
  if (id === BUILTIN_JS_ID) return; // Can't delete built-in
  let courses = loadCustomCourses();
  courses = courses.filter((c) => c.id !== id);
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  // Also clean up progress and activity
  localStorage.removeItem(`progress_${id}`);
  localStorage.removeItem(`activity_${id}`);
  // Clean up content
  localStorage.removeItem(`courseContent_${id}`);
}

// --- Course Content ---

export function getCourseContent(id) {
  if (id === BUILTIN_JS_ID) return null; // Use import for built-in
  try {
    return (
      JSON.parse(localStorage.getItem(`courseContent_${id}`)) ||
      getEmptyContent()
    );
  } catch {
    return getEmptyContent();
  }
}

export function saveCourseContent(id, content) {
  localStorage.setItem(`courseContent_${id}`, JSON.stringify(content));
}

// --- Progress (per-course) ---

export function getProgress(courseId) {
  try {
    const key =
      courseId === BUILTIN_JS_ID ? "jsCurriculumState" : `progress_${courseId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function saveProgress(courseId, progress) {
  const key =
    courseId === BUILTIN_JS_ID ? "jsCurriculumState" : `progress_${courseId}`;
  localStorage.setItem(key, JSON.stringify(progress));
}

// --- Activity (per-course) ---

export function getActivity(courseId) {
  try {
    const key =
      courseId === BUILTIN_JS_ID ? "jsActivityDates" : `activity_${courseId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function saveActivity(courseId, activity) {
  const key =
    courseId === BUILTIN_JS_ID ? "jsActivityDates" : `activity_${courseId}`;
  localStorage.setItem(key, JSON.stringify(activity));
}

// --- Helpers ---

function loadCustomCourses() {
  try {
    return JSON.parse(localStorage.getItem(COURSES_KEY)) || [];
  } catch {
    return [];
  }
}

function getEmptyContent() {
  return [
    {
      title: "Stage 1: Getting Started",
      description: "Begin your learning journey.",
      items: [],
    },
  ];
}

export function generateId() {
  return (
    "course_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  );
}
