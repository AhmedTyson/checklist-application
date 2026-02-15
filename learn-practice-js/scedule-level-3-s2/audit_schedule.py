import json
import re

md_path = r'c:\Programming\C2C\css-practicing\c2c-js\learn-practice-js\scedule-level-3-s2\revised_selected_courses.md'
json_path = r'c:\Programming\C2C\css-practicing\c2c-js\learn-practice-js\scedule-level-3-s2\scedule-data.json'

def parse_md(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    sessions = []
    current_day = ""
    current_time = ""
    
    # Days: ## SUNDAY (الأحد)
    # Times: ### 8:00-10:00 AM
    # Items: - **Auditing** - Dr. Hanan Gaber (د/حنان جابر) - G1 - Room 6
    
    lines = content.split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith('## ') and '(' in line:
            current_day = line.split(' ')[1].capitalize()
        elif line.startswith('### '):
            current_time = line.replace('### ', '').strip()
            # Standardize time format e.g. "8:00-10:00 AM" -> "8:00 AM – 10:00 AM"
            time_match = re.match(r'(\d+:\d+)-(\d+:\d+)\s+(AM|PM)', current_time)
            if time_match:
                start, end, period = time_match.groups()
                # If end time is e.g. 12:00 PM, and start is 10:00, we need to be careful with period.
                # However, the MD uses e.g. "10:00-12:00 PM" which usually means 10 AM to 12 PM.
                # Let's just store it as is and normalize during comparison if needed.
                pass
        elif line.startswith('- **'):
            # - **Auditing** - Dr. Hanan Gaber (د/حنان جابر) - G1 - Room 6
            match = re.match(r'- \*\*([^*]+)\*\* - ([^-]+) - ([^-]+) - (.*)', line)
            if match:
                subject, doctor, group, room = match.groups()
                doctor = doctor.strip()
                dr_ar = ""
                dr_en = ""
                if '(' in doctor:
                    parts = doctor.split('(', 1)
                    dr_en = parts[0].strip()
                    dr_ar = parts[1].replace(')', '').replace('د/', 'د. ').strip()
                
                sessions.append({
                    "subject": subject.strip(),
                    "group": group.strip(),
                    "doctorAr": dr_ar,
                    "doctorEn": dr_en,
                    "day": current_day,
                    "time": current_time,
                    "room": room.strip()
                })
    return sessions

def compare():
    md_sessions = parse_md(md_path)
    with open(json_path, 'r', encoding='utf-8') as f:
        json_sessions = json.load(f)
    
    print(f"Total MD sessions: {len(md_sessions)}")
    print(f"Total JSON sessions: {len(json_sessions)}")
    
    # Map by Subject + Group
    json_map = {(s['subject'].lower(), s['group'].upper()): s for s in json_sessions}
    
    mismatches = []
    missing_in_json = []
    
    for ms in md_sessions:
        key = (ms['subject'].lower(), ms['group'].upper())
        if key not in json_map:
            missing_in_json.append(ms)
            continue
        
        js = json_map[key]
        
        # Check Day
        if ms['day'].lower() != js['day'].lower():
            mismatches.append(f"Day mismatch: {ms['subject']} {ms['group']} | MD: {ms['day']} vs JSON: {js['day']}")
        
        # Check Time (Loose match)
        ms_time_clean = ms['time'].replace('-', '').replace(' ', '').lower()
        js_time_clean = js['time'].replace('–', '').replace(' ', '').lower()
        if ms_time_clean not in js_time_clean and js_time_clean not in ms_time_clean:
            # Check if it's just a subtle difference like 10:00-12:00 PM vs 10:00 AM - 12:00 PM
             mismatches.append(f"Time mismatch: {ms['subject']} {ms['group']} | MD: {ms['time']} vs JSON: {js['time']}")

    print("\n--- DISCREPANCIES ---")
    for m in mismatches:
        print(m)
        
    print(f"\n--- MISSING IN JSON ({len(missing_in_json)}) ---")
    for m in missing_in_json:
        print(f"{m['subject']} {m['group']} ({m['day']} {m['time']})")

if __name__ == "__main__":
    compare()
