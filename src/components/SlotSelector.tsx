
const SlotSelector = ({ doctor, onSelect }) => {
  if (!doctor) return null;

  return (
    <div className="border rounded-lg p-3">
      <h2 className="font-bold text-lg mb-4">Available Slots for {doctor.name}</h2>
      <div className="grid grid-cols-2 gap-2">
        {doctor.slots.map((slot: string) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className="border rounded p-3 hover:bg-green-50 hover:border-green-400 text-center transition-colors"
          >
            ⏰ {slot}
          </button>
        ))}
      </div>
      {doctor.slots.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No slots available for this doctor.
        </p>
      )}
    </div>
  );
};

export default SlotSelector;
