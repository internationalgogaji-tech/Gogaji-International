"use client";

import { useEffect, useMemo, useState } from "react";
import { ImagePlus, Pencil, Save, Trash2, Upload, Video } from "lucide-react";
import { API_BASE } from "@/lib/api";

const blankForm = { title: "", caption: "", videoUrl: "", posterUrl: "", product: "", sortOrder: 0, isActive: true };

export default function AdminClientFeedPage() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState("");

  const selectedProduct = useMemo(() => products.find((product) => product._id === form.product), [products, form.product]);
  const field = (name, value) => setForm((old) => ({ ...old, [name]: value }));

  const loadData = async () => {
    const [feedResponse, productResponse] = await Promise.all([
      fetch(`${API_BASE}/api/client-feed/admin`),
      fetch(`${API_BASE}/api/products?limit=500`),
    ]);
    const [feedData, productData] = await Promise.all([feedResponse.json(), productResponse.json()]);
    setItems(feedData?.items || []);
    setProducts(productData?.products || []);
  };

  useEffect(() => { loadData().catch(() => setMessage("Could not load client feed data.")); }, []);

 const uploadFile = async (file, fieldName) => {
  if (!file) return;

  const isVideo = fieldName === "videoUrl";

  if (isVideo && !file.type.startsWith("video/")) {
    setMessage("Please select a valid video file.");
    return;
  }

  if (!isVideo && !file.type.startsWith("image/")) {
    setMessage("Please select a valid poster image.");
    return;
  }

  // 100 MB video limit
  if (isVideo && file.size > 100 * 1024 * 1024) {
    setMessage("Video must be smaller than 100 MB.");
    return;
  }

  setUploading(fieldName);
  setMessage("");

  try {
    const body = new FormData();

    body.append("file", file);
    body.append("kind", isVideo ? "video" : "poster");

    const response = await fetch(
      `${API_BASE}/api/client-feed/upload`,
      {
        method: "POST",
        body,
      }
    );

    const text = await response.text();

    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(
        `Upload API returned invalid response (${response.status}).`
      );
    }

    if (!response.ok) {
      throw new Error(
        data?.message ||
          data?.error ||
          `Upload failed (${response.status}).`
      );
    }

    // Backend ke common response formats support karega
    const uploadedUrl =
      data?.url ||
      data?.fileUrl ||
      data?.videoUrl ||
      data?.posterUrl ||
      data?.file?.url;

    if (!uploadedUrl) {
      console.error("Upload response:", data);

      throw new Error(
        "File uploaded but backend did not return the file URL."
      );
    }

    field(fieldName, uploadedUrl);

    setMessage(
      isVideo
        ? "Video uploaded successfully ✓"
        : "Poster image uploaded successfully ✓"
    );
  } catch (error) {
    console.error("Client Feed upload error:", error);

    setMessage(
      error?.message || "File upload failed. Please try again."
    );
  } finally {
    setUploading("");
  }
};

  const submit = async (event) => {
  event.preventDefault();

  if (!form.title.trim()) {
    setMessage("Please enter feed title.");
    return;
  }

  if (!form.product) {
    setMessage("Please select a product.");
    return;
  }

  if (!form.videoUrl) {
    setMessage(
      "Video has not uploaded successfully yet. Please upload the video first."
    );
    return;
  }

  setBusy(true);
  setMessage("");

  try {
    const response = await fetch(
      `${API_BASE}/api/client-feed${editingId ? `/${editingId}` : ""}`,
      {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          title: form.title.trim(),
          caption: form.caption.trim(),
          sortOrder: Number(form.sortOrder || 0),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message || "Unable to save feed item."
      );
    }

    setForm(blankForm);
    setEditingId("");
    setMessage("Client feed item saved successfully ✓");

    await loadData();
  } catch (error) {
    console.error("Save client feed error:", error);

    setMessage(
      error?.message || "Unable to save feed item."
    );
  } finally {
    setBusy(false);
  }
};

  const edit = (item) => {
    setEditingId(item._id);
    setForm({ title: item.title || "", caption: item.caption || "", videoUrl: item.videoUrl || "", posterUrl: item.posterUrl || "", product: item.product?._id || item.product || "", sortOrder: item.sortOrder || 0, isActive: item.isActive !== false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this client-feed item?")) return;
    await fetch(`${API_BASE}/api/client-feed/${id}`, { method: "DELETE" });
    await loadData();
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-8">
      <div className="mb-8 flex items-center gap-3"><span className="rounded-xl bg-[#EAF5EF] p-3 text-[#1F5C4A]"><Video /></span><div><h1 className="text-2xl font-black text-[#1F5C4A]">Client Feed</h1><p className="text-sm text-slate-500">Add a video and attach the product shoppers can buy.</p></div></div>
      <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className="text-sm font-bold text-slate-700">Feed title<input value={form.title} onChange={(e) => field("title", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5" placeholder="Modern living room styling" required /></label>
          <label className="text-sm font-bold text-slate-700">Product<select value={form.product} onChange={(e) => field("product", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5" required><option value="">Select product</option>{products.map((product) => <option key={product._id} value={product._id}>{product.name}</option>)}</select></label>
          <label className="text-sm font-bold text-slate-700">Display order<input type="number" min="0" value={form.sortOrder} onChange={(e) => field("sortOrder", e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5" /></label>
          <label className="text-sm font-bold text-slate-700 md:col-span-2">Upload video <span className="font-normal text-slate-400">(MP4, max 100 MB)</span><span className="mt-1.5 flex items-center gap-3 rounded-xl border border-dashed border-[#8CC7A7] bg-[#F6FBF7] px-3 py-2.5"><Video size={19} className="text-[#1F5C4A]" /><input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(e) => uploadFile(e.target.files?.[0], "videoUrl")} className="min-w-0 text-xs" />{uploading === "videoUrl" ? <span className="text-xs font-bold text-[#1F5C4A]">Uploading…</span> : null}</span>{form.videoUrl ? <p className="mt-1 truncate text-xs font-semibold text-green-700">Video selected ✓</p> : null}</label>
          <label className="text-sm font-bold text-slate-700">Upload poster image <span className="font-normal text-slate-400">(optional)</span><span className="mt-1.5 flex items-center gap-2 rounded-xl border border-dashed border-[#8CC7A7] bg-[#F6FBF7] px-3 py-2.5"><ImagePlus size={19} className="text-[#1F5C4A]" /><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => uploadFile(e.target.files?.[0], "posterUrl")} className="min-w-0 text-xs" />{uploading === "posterUrl" ? <span className="text-xs font-bold text-[#1F5C4A]">Uploading…</span> : null}</span>{form.posterUrl ? <p className="mt-1 truncate text-xs font-semibold text-green-700">Poster selected ✓</p> : null}</label>
          <label className="text-sm font-bold text-slate-700 md:col-span-2 xl:col-span-3">Caption <span className="font-normal text-slate-400">(optional)</span><textarea value={form.caption} onChange={(e) => field("caption", e.target.value)} className="mt-1.5 min-h-20 w-full rounded-xl border border-slate-300 px-3 py-2.5" /></label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" checked={form.isActive} onChange={(e) => field("isActive", e.target.checked)} /> Show on website</label><div className="flex gap-2"><button type="button" onClick={() => { setForm(blankForm); setEditingId(""); }} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold">Cancel</button><button disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#1F5C4A] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"><Save size={16} />{busy ? "Saving..." : editingId ? "Update feed item" : "Add feed item"}</button></div></div>
        {selectedProduct ? <p className="mt-3 text-xs text-[#1F5C4A]">Linked product: {selectedProduct.name}</p> : null}{message ? <p className="mt-3 text-sm font-semibold text-[#B7791F]">{message}</p> : null}
      </form>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="border-b p-5"><h2 className="font-black text-[#1F5C4A]">Saved videos ({items.length})</h2></div><div className="divide-y">{items.map((item) => <div key={item._id} className="flex items-center gap-4 p-4"><video src={item.videoUrl} className="h-20 w-14 rounded-lg bg-slate-100 object-cover" muted /><div className="min-w-0 flex-1"><p className="truncate font-bold">{item.title}</p><p className="truncate text-sm text-slate-500">{item.product?.name || "Product unavailable"} · Order {item.sortOrder}</p><p className={item.isActive ? "text-xs font-bold text-green-700" : "text-xs font-bold text-slate-400"}>{item.isActive ? "Live" : "Hidden"}</p></div><button onClick={() => edit(item)} className="rounded-lg p-2 text-[#1F5C4A] hover:bg-[#EAF5EF]" aria-label="Edit"><Pencil size={17} /></button><button onClick={() => remove(item._id)} className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Delete"><Trash2 size={17} /></button></div>)}{!items.length ? <p className="p-8 text-center text-sm text-slate-500">No feed videos yet.</p> : null}</div></div>
    </div>
  );
}
