import { useState } from "react";
import { X } from "lucide-react";

const TYPES = ["MOVIE", "SERIES", "TV_SHOW", "ANIMATION"];

// movie = null  -> "Add" mode
// movie = {...} -> "Edit" mode, pre-filled
export default function AdminMovieForm({ movie, onClose, onSave }) {
  const editing = !!movie;

  const [form, setForm] = useState({
    title: movie?.title ?? "",
    description: movie?.description ?? "",
    genre: movie?.genre ?? "",
    movieType: movie?.movieType ?? "MOVIE",
    releaseYear: movie?.releaseYear ?? new Date().getFullYear(),
    premiumOnly: movie?.premiumOnly ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm({
      ...form,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      // The dashboard closes this modal once the save succeeds
      await onSave({ ...form, releaseYear: Number(form.releaseYear) });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editing ? "Edit movie" : "Add a movie"}</h2>
          <button type="button" className="action-button" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={submit} className="auth-form">
          <label>
            Title
            <input value={form.title} onChange={set("title")} maxLength={200} required />
          </label>

          <div className="form-row">
            <label>
              Genre
              <input value={form.genre} onChange={set("genre")} required />
            </label>

            <label>
              Type
              <select value={form.movieType} onChange={set("movieType")}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replace("_", " ")}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Release year
            <input
              type="number"
              min="1888"
              max="2100"
              value={form.releaseYear}
              onChange={set("releaseYear")}
              required
            />
          </label>

          <label>
            Description
            <textarea
              rows={4}
              maxLength={1000}
              value={form.description}
              onChange={set("description")}
            />
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={form.premiumOnly}
              onChange={set("premiumOnly")}
            />
            Premium members only
          </label>

          <button type="submit" className="primary-button full-width" disabled={saving}>
            {saving ? "Saving..." : editing ? "Save changes" : "Add movie"}
          </button>
        </form>
      </div>
    </div>
  );
}