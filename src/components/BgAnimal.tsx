export function BgAnimal({
  src,
  className,
  rotate = 0,
}: {
  src: string;
  className: string;
  rotate?: number;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      width={512}
      height={512}
      className={`pointer-events-none select-none absolute opacity-40 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}
