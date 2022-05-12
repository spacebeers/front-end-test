import { useContext } from "preact/hooks";
import { ApplicationContextType, ApplicationContext } from "../contexts/application.context";

export const useApplication = (): ApplicationContextType => useContext(ApplicationContext);