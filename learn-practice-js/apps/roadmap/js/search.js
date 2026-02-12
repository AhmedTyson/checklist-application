import { contentData } from "../content.js";

export const search = {
  run: (query) => {
    const q = query.toLowerCase();
    const results = [];
    contentData.forEach((stage, sIdx) => {
      stage.items.forEach((item, iIdx) => {
        if (
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)
        ) {
          results.push({ ...item, sIdx, iIdx });
        }
      });
    });
    return results;
  },
};
