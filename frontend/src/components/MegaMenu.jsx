import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MegaMenu = ({ items, rightCard }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="
        absolute top-full left-0
        mt-4
        w-[750px]
        bg-card
        rounded-3xl
        shadow-xl
        border border-border
        z-[999]
      "
    >
      <div className="grid grid-cols-2">

        {/* LEFT SIDE */}
        <div className="p-8 space-y-8 bg-muted/40 rounded-l-3xl">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="block group transition"
            >
              <h4 className="font-semibold text-foreground text-lg group-hover:text-primary transition">
                {item.title}
              </h4>
              <p className="text-muted-foreground mt-2">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6">
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 h-full flex flex-col justify-between">

            <div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                {rightCard.tag}
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                {rightCard.title}
              </h3>

              <p className="text-sm mt-3 text-primary-foreground/90">
                {rightCard.desc}
              </p>
            </div>

            <Link
              to={rightCard.href}
              className="
                mt-6
                inline-block
                bg-background
                text-primary
                font-medium
                px-5
                py-2
                rounded-full
                text-center
                hover:opacity-90
                transition
              "
            >
              {rightCard.cta} →
            </Link>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default MegaMenu;