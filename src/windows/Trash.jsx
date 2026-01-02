import useWindowStore from "#store/window";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { locations } from "#constants";

const Trash = () => {
  const { openWindow } = useWindowStore();
  const trashItems = locations.trash.children;

  return (
    <>
      <div id="window-header">
        <WindowControls target="trash" />
        <h2>Trash</h2>
      </div>

      <div className="p-20">
        <div className="grid grid-cols-4 gap-4">
          {trashItems.map(({ id, name, icon, kind, fileType, imageUrl }) => (
            <div
              key={id}
              onClick={() =>
                openWindow("imgfile", {
                  id,
                  name,
                  icon,
                  kind,
                  fileType,
                  imageUrl,
                })
              }
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <img src={icon} alt={name} />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const TrashWindow = WindowWrapper(Trash, "trash");
export default TrashWindow;
