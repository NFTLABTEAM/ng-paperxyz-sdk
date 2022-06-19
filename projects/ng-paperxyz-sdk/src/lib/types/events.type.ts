import { PaperCompoundEventTypes } from './compound-events.type';

/** Event types object mapping */
export type PaperSDKEvents<T> = { [key in PaperCompoundEventTypes]?: (data: T) => void };
