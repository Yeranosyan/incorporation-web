import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { socials } from "#constants";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Us</h2>
      </div>

      <div className="p-5 space-y-2">
        <div className="text-sm mt-5 mb-10">
          <h1>
            If you have any questions, please contact us and we will answer you
            shortly.
          </h1>
          <p className="text-xs font-light text-white/40 cursor-pointer">
            office@onecodio.com
          </p>
        </div>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
