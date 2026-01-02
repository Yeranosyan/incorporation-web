import useWindowStore from "#store/window";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5">
        {image ? (
          <div className="h-70">
            <img src={image} alt={name} />
          </div>
        ) : null}

        {subtitle ? <h3>{subtitle}</h3> : null}

        {Array.isArray(description) && description.length > 0 ? (
          <div>
            {description.map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
