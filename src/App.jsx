import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Finder,
  CompanyProfile,
  Safari,
  Terminal,
  Text,
  Image,
  Contact,
  Photos,
  Trash,
  Vscode,
} from "#windows";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <CompanyProfile />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      <Trash />
      <Vscode />

      <Home />
    </main>
  );
}

export default App;
