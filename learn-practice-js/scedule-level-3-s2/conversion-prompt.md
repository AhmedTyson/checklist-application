# Prompt for Converting Schedule Markdown to JSON

You can use the following prompt with any LLM (like Claude or ChatGPT) to convert your schedule markdown files into the exact JSON format used in this project.

---

### **Prompt:**

Please convert the following markdown schedule data into a structured JSON array. 

**Rules for Conversion:**
1. **Output Format**: A flat array of objects (one object per table row).
2. **Object Structure**: Each object MUST contain exactly these keys:
   - `"subject"`: The name of the subject. Extract this from the `###` heading by removing the numbering (e.g., "1. ") and the bold markers (`**`).
   - `"group"`: The group ID (e.g., "G1").
   - `"doctor"`: The name of the doctor (including both Arabic and English text if present).
   - `"day"`: The day of the week.
   - `"time"`: The time range (e.g., "8:00 AM – 10:00 AM").
   - `"code"`: The Teams Code (extract only the alphanumeric code, remove bold formatting like `**`).
3. **Subject Extraction**: Use the text from the nearest `###` heading as the `"subject"` value for all following rows until the next heading.
4. **Data Cleaning**: 
   - Trim any leading/trailing whitespace.
   - For the `"code"` field, ensure it is just the string (e.g., "dp45mtq").

**Input Data:**
[PASTE YOUR MARKDOWN CONTENT HERE]

---

### **Example Input:**
### **1. Auditing**
| Group | Doctor Name | Day | Time | Teams Code |
| :--- | :--- | :--- | :--- | :--- |
| **G1** | د. حنان جابر (Dr. Hanan Gaber) | Monday | 8:00 AM – 10:00 AM | **dp45mtq** |

### **Example Output:**
[
  {
    "subject": "Auditing",
    "group": "G1",
    "doctor": "د. حنان جابر (Dr. Hanan Gaber)",
    "day": "Monday",
    "time": "8:00 AM – 10:00 AM",
    "code": "dp45mtq"
  }
]
