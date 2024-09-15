import { X } from "lucide-react"
import LeftSidebar from "./components/left-sidebar"
import RightSidebar from "./components/right-sidebar"
import MiddleCanvas from "./components/middle-canvas"
import 'react-image-crop/dist/ReactCrop.css'


function App() {


  return (
    <div className="h-full w-full flex flex-col items-center justify-center min-h-screen bg-zinc-400 p-8">
      <div className="flex flex-col flex-grow w-full bg-white rounded-t-2xl shadow-lg">
        <div className="w-full flex flex-row items-center justify-between border-b-2 border-zinc-200 px-4 py-2">
          <p className="text-2xl font-semibold">
            Image Editor
          </p>
          <div className="bg-zinc-100 rounded-full p-2 cursor-pointer">
            <X />
          </div>
        </div>
        <main className="flex-grow flex items-stretch">
          <LeftSidebar />
          <MiddleCanvas />
          <RightSidebar />
        </main>
      </div>
    </div>
  )
}

export default App
