import { TContainer } from '../utils/types'

// children mean other content in the page
export default function Container({ children }: TContainer) {
  return (
    <div dir="rtl" className=" max-w-[1920px]  mx-auto h-full text-white ">
      {children}
    </div>
  )
}
