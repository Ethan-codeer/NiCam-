import { cameras } from './data';
export const MAX_COMPARISON = 3;
const validIds = new Set(cameras.map(camera => camera.id));
export const normalizeCompareIds = (ids: string[]) => [...new Set(ids)].filter(id => validIds.has(id)).slice(0, MAX_COMPARISON);
export const comparisonPath = (ids: string[]) => `/compare?ids=${normalizeCompareIds(ids).join(',')}`;
export const toggleComparison = (ids: string[], id: string) => {
  const current = normalizeCompareIds(ids);
  return current.includes(id) ? current.filter(value => value !== id) : normalizeCompareIds([...current, id]);
};
