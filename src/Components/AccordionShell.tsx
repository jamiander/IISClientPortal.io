import { Accordion } from "flowbite-react";
import { Company } from "../Store/CompanySlice";

interface AccordionProps{
  company:Company
}

export default function AccordionShell(props:AccordionProps){
  return(
    <Accordion collapseAll={true} alwaysOpen={true}>
      <Accordion.Panel>
        <Accordion.Title>
          
        </Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Check out this guide to learn how to 
            <a
              href="https://flowbite.com/docs/getting-started/introduction/"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              get started
            </a>
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  )
}