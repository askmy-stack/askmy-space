"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { execute, greet, type Line } from "@/lib/terminal/engine";
import {
  incrementVisits,
  loadSession,
  setLastSection,
  setUserName,
  type TerminalSession,
} from "@/lib/terminal/session";

interface Entry {
  id: number;
  input: string | null; // null for system/greeting lines
  lines: Line[];
}

interface TerminalState {
  entries: Entry[];
  input: string;
  historyIndex: number; // -1 means "current (editing) input"
  session: TerminalSession;
}

const MAX_HISTORY = 100;

export function useTerminal() {
  const [state, setState] = useState<TerminalState>({
    entries: [],
    input: "",
    historyIndex: -1,
    session: {
      visits: 0,
      lastSection: null,
      userName: null,
      isFirstVisit: true,
    },
  });
  const historyRef = useRef<string[]>([]);
  const nextIdRef = useRef(1);
  const mountedRef = useRef(false);

  // Boot — load session, greet, bump visit count
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const session = loadSession();
    const greeting = greet(session);
    setState((prev) => ({
      ...prev,
      session,
      entries: [
        {
          id: nextIdRef.current++,
          input: null,
          lines: greeting,
        },
      ],
    }));
    incrementVisits();
  }, []);

  const setInput = useCallback((value: string) => {
    setState((prev) => ({ ...prev, input: value, historyIndex: -1 }));
  }, []);

  const submit = useCallback(() => {
    setState((prev) => {
      const cmd = prev.input.trim();
      if (!cmd) return prev;

      // Add to command history (skip dupes)
      const hist = historyRef.current;
      if (hist[hist.length - 1] !== cmd) {
        hist.push(cmd);
        if (hist.length > MAX_HISTORY) hist.shift();
      }

      const response = execute(cmd, prev.session);

      // Side effects
      if (response.scrollTo) {
        const id = response.scrollTo;
        // Defer to next tick so terminal render completes first
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
        setLastSection(id);
      }
      if (response.captureName) {
        setUserName(response.captureName);
      }

      const newEntry: Entry = {
        id: nextIdRef.current++,
        input: cmd,
        lines: response.lines,
      };

      const nextEntries = response.clear ? [] : [...prev.entries, newEntry];

      // Updated session reflects captured name and last section
      const nextSession: TerminalSession = {
        ...prev.session,
        userName: response.captureName ?? prev.session.userName,
        lastSection: response.scrollTo ?? prev.session.lastSection,
      };

      return {
        ...prev,
        input: "",
        historyIndex: -1,
        entries: nextEntries,
        session: nextSession,
      };
    });
  }, []);

  const historyPrev = useCallback(() => {
    setState((prev) => {
      const hist = historyRef.current;
      if (hist.length === 0) return prev;
      const newIndex =
        prev.historyIndex === -1
          ? hist.length - 1
          : Math.max(0, prev.historyIndex - 1);
      return {
        ...prev,
        historyIndex: newIndex,
        input: hist[newIndex] ?? "",
      };
    });
  }, []);

  const historyNext = useCallback(() => {
    setState((prev) => {
      const hist = historyRef.current;
      if (hist.length === 0 || prev.historyIndex === -1) return prev;
      const newIndex = prev.historyIndex + 1;
      if (newIndex >= hist.length) {
        return { ...prev, historyIndex: -1, input: "" };
      }
      return { ...prev, historyIndex: newIndex, input: hist[newIndex] };
    });
  }, []);

  return {
    entries: state.entries,
    input: state.input,
    session: state.session,
    setInput,
    submit,
    historyPrev,
    historyNext,
  };
}
