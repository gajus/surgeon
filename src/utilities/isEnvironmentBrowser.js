// @flow

export default (): boolean => {
  return typeof window === 'object' && typeof document === 'object';
};
