// State Management
export const state = {
  progress: JSON.parse(localStorage.getItem("jsCurriculumState")) || [],
  currentStageIdx: -1, // -1 = Dashboard
  selectedItemIdx: null,
  tempSearchContext: null,
};

export const actions = {
  save: () => {
    localStorage.setItem("jsCurriculumState", JSON.stringify(state.progress));
  },

  resetData: () => {
    if (confirm("Reset entire progress?")) {
      state.progress = [];
      actions.save();
      location.reload();
    }
  },

  toggleItemComplete: (id) => {
    if (!state.progress.includes(id)) {
      state.progress.push(id);
    } else {
      const index = state.progress.indexOf(id);
      if (index > -1) state.progress.splice(index, 1);
    }
    actions.save();
  },

  isCompleted: (id) => state.progress.includes(id),
};
