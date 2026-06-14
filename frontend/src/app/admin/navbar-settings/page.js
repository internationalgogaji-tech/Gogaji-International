export default function NavbarSettingsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Navbar Settings
      </h1>

      <div className="grid gap-4">

        <input
          className="border p-3 rounded"
          placeholder="Announcement Text"
        />

        <input
          className="border p-3 rounded"
          placeholder="Theme Color"
        />

        <input
          className="border p-3 rounded"
          placeholder="Hover Color"
        />

      </div>

    </div>
  );
}