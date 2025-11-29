export default function Title({ text, className }) {
    return <h1 className={`text-3xl font-bold text-center ${className}`}>{text}</h1>;
}
