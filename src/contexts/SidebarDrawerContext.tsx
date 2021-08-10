import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, ReactNode } from "react";

interface SidebarDrawerContextProps {
  children: ReactNode;
}

type SidebarDrawerContextValues = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDrawerContextValues);

export function SidebarDrawerProvider({ children }: SidebarDrawerContextProps) {

  const disclosure = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider
      value={disclosure}
    >
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);