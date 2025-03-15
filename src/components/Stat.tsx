const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div className="text-center">
        <p className="text-lg font-bold">{value}</p>
        <p className="text-sm text-gray-600" aria-label={label}>
            {label}
        </p>
    </div>
);

export default Stat;
