// Context
import { createContext } from 'react';
import pages from './State';

const PageContext = createContext(pages);
const PageProvider = PageContext.Provider;

export { PageContext, PageProvider };