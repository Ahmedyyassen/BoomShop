import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { dispatchApp, RootApp } from "../store";

export const useAppSelector: TypedUseSelectorHook<RootApp> = useSelector;
export const useAppDispatch = () => useDispatch<dispatchApp>();
