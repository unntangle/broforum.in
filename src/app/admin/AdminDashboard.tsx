"use client";

import { useState, useTransition, useRef } from "react";
import {
  Users, Calendar, Image as ImageIcon, MessageSquare,
  LayoutDashboard, Plus, Search, Trash2, Edit3,
  X, Check, Bell, LogOut, Menu, Save,
  Upload, Tag, Phone, Mail, ChevronRight,
  Eye, Settings, ArrowUpRight,
} from "lucide-react";
import type { MemberRow, EventRow, GalleryRow, EnquiryRow } from "@/lib/supabase";
import { addMember, updateMember, deleteMember } from "./actions/members";
import { addEvent, updateEvent, deleteEvent } from "./actions/events";
import { addGalleryItem, deleteGalleryItem, uploadGalleryImage } from "./actions/gallery";
import { updateEnquiryStatus, deleteEnquiry } from "./actions/enquiries";

// ── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.)\s*/i, "").trim()
    .split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function statusPill(status: string) {
  const map: Record<string, string> = {
    active:    "bg-emerald-50 text-emerald-700 ring-emerald-200",
    inactive:  "bg-gray-100 text-gray-500 ring-gray-200",
    upcoming:  "bg-blue-50 text-blue-700 ring-blue-200",
    completed: "bg-gray-100 text-gray-500 ring-gray-200",
    cancelled: "bg-red-50 text-red-600 ring-red-200",
    new:       "bg-amber-50 text-amber-700 ring-amber-200",
    contacted: "bg-blue-50 text-blue-700 ring-blue-200",
    resolved:  "bg-emerald-50 text-emerald-700 ring-emerald-200",
  };
  return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${map[status] ?? "bg-gray-100 text-gray-600"}`;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

const inputCls = "w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder-gray-400";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900 font-semibold text-base">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"><X size={16} /></button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium
      ${ok ? "bg-white border-emerald-200 text-emerald-700" : "bg-white border-red-200 text-red-600"}`}>
      {ok ? <Check size={15} className="text-emerald-500" /> : <X size={15} className="text-red-500" />}
      {msg}
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const show = (msg: string, ok = true) => { setToast({ msg, ok }); setTimeout(() => setToast(null), 3000); };
  return { toast, show };
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, iconBg, iconColor }: {
  icon: React.ElementType; label: string; value: string | number; iconBg: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={18} className={iconColor} />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────

function Dashboard({ members, events, enquiries, gallery }: {
  members: MemberRow[]; events: EventRow[]; enquiries: EnquiryRow[]; gallery: GalleryRow[];
}) {
  const newEnq = enquiries.filter(e => e.status === "new").length;
  const upcoming = events.filter(e => e.status === "upcoming").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back. Here's an overview of BRO Forum.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}         label="Members"          value={members.length} iconBg="bg-blue-50"   iconColor="text-blue-500" />
        <StatCard icon={MessageSquare} label="Enquiries"        value={enquiries.length} iconBg="bg-green-50"  iconColor="text-green-500" />
        <StatCard icon={Calendar}      label="Upcoming Events"  value={upcoming}       iconBg="bg-amber-50"  iconColor="text-amber-500" />
        <StatCard icon={ImageIcon}     label="Gallery Photos"   value={gallery.length} iconBg="bg-purple-50" iconColor="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 text-sm">Recent Enquiries</h2>
            {newEnq > 0 && (
              <span className="bg-amber-50 text-amber-700 ring-1 ring-amber-200 text-xs font-medium px-2 py-0.5 rounded-full">
                {newEnq} new
              </span>
            )}
          </div>
          <div className="divide-y divide-gray-50">
            {enquiries.slice(0, 5).map(e => (
              <div key={e.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-gray-600 font-semibold text-xs">{e.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{e.name}</p>
                  <p className="text-xs text-gray-400 truncate">{e.interest} · {new Date(e.created_at).toLocaleDateString("en-IN")}</p>
                </div>
                <span className={statusPill(e.status)}>{e.status}</span>
              </div>
            ))}
            {enquiries.length === 0 && <p className="text-center text-gray-400 text-sm py-8">No enquiries yet.</p>}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900 text-sm">Upcoming Events</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {events.filter(e => e.status === "upcoming").slice(0, 5).map(ev => (
              <div key={ev.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex flex-col items-center justify-center shrink-0">
                  <span className="text-blue-600 font-bold text-sm leading-none">{ev.date.split("-")[2]}</span>
                  <span className="text-blue-400 text-[9px] font-medium">
                    {new Date(ev.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{ev.title}</p>
                  <p className="text-xs text-gray-400">{ev.time} · {ev.venue}</p>
                </div>
                <span className="text-xs text-gray-400">{ev.registrations} reg.</span>
              </div>
            ))}
            {events.filter(e => e.status === "upcoming").length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MEMBERS ───────────────────────────────────────────────────────────────────

function MembersSection({ initialMembers }: { initialMembers: MemberRow[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<MemberRow | null>(null);
  const [form, setForm] = useState({ name: "", business: "", category: "", email: "", phone: "", status: "active", website: "" });
  const [isPending, startTransition] = useTransition();
  const { toast, show } = useToast();

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.business.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm({ name: "", business: "", category: "", email: "", phone: "", status: "active", website: "" }); setEditing(null); setModal("add"); };
  const openEdit = (m: MemberRow) => { setForm({ name: m.name, business: m.business, category: m.category, email: m.email ?? "", phone: m.phone ?? "", status: m.status, website: m.website ?? "" }); setEditing(m); setModal("edit"); };

  const save = () => {
    startTransition(async () => {
      try {
        if (editing) { const u = await updateMember(editing.id, form as any); setMembers(p => p.map(m => m.id === editing.id ? u : m)); show("Member updated"); }
        else { const c = await addMember(form as any); setMembers(p => [...p, c]); show("Member added"); }
        setModal(null);
      } catch (e: any) { show(e.message ?? "Error", false); }
    });
  };

  const remove = (id: number) => {
    if (!confirm("Delete this member?")) return;
    startTransition(async () => {
      try { await deleteMember(id); setMembers(p => p.filter(m => m.id !== id)); show("Member deleted"); }
      catch (e: any) { show(e.message ?? "Error", false); }
    });
  };

  return (
    <div>
      {toast && <Toast {...toast} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-500 text-sm mt-0.5">{members.length} total members</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus size={15} /> Add Member
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…"
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all placeholder-gray-400" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Member</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Contact</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-gray-50/40 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <span className="text-gray-600 font-semibold text-xs">{initials(m.name)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{m.name}</p>
                      <p className="text-gray-400 text-xs">{m.business}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell"><span className="text-gray-600 text-sm">{m.category}</span></td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <p className="text-gray-600 text-xs">{m.email || "—"}</p>
                  <p className="text-gray-400 text-xs">{m.phone}</p>
                </td>
                <td className="px-5 py-3.5"><span className={statusPill(m.status)}>{m.status}</span></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 justify-end">
                    <button onClick={() => openEdit(m)} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"><Edit3 size={13} /></button>
                    <button onClick={() => remove(m.id)} disabled={isPending} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 text-sm py-10">No members found.</p>}
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Add Member" : "Edit Member"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Full Name"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Mr. Name" /></Field>
              <Field label="Category"><input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls} placeholder="e.g. Plumbing" /></Field>
            </div>
            <Field label="Business / Company"><input value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} className={inputCls} placeholder="Company Name" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email"><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} placeholder="email@example.com" /></Field>
              <Field label="Phone"><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="9876543210" /></Field>
            </div>
            <Field label="Website"><input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className={inputCls} placeholder="https://example.com" /></Field>
            <Field label="Status">
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
            <button onClick={save} disabled={isPending} className="w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              <Save size={14} /> {isPending ? "Saving…" : modal === "add" ? "Add Member" : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── EVENTS ────────────────────────────────────────────────────────────────────

function EventsSection({ initialEvents }: { initialEvents: EventRow[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [form, setForm] = useState({ title: "", date: "", time: "8:30 AM", venue: "Chennai Chapter", type: "Weekly", status: "upcoming", registrations: 0 });
  const [isPending, startTransition] = useTransition();
  const { toast, show } = useToast();

  const openAdd = () => { setForm({ title: "", date: "", time: "8:30 AM", venue: "Chennai Chapter", type: "Weekly", status: "upcoming", registrations: 0 }); setEditing(null); setModal("add"); };
  const openEdit = (ev: EventRow) => { setForm({ title: ev.title, date: ev.date, time: ev.time, venue: ev.venue, type: ev.type, status: ev.status, registrations: ev.registrations }); setEditing(ev); setModal("edit"); };

  const save = () => {
    startTransition(async () => {
      try {
        if (editing) { const u = await updateEvent(editing.id, form as any); setEvents(p => p.map(e => e.id === editing.id ? u : e)); show("Event updated"); }
        else { const c = await addEvent(form as any); setEvents(p => [c, ...p]); show("Event added"); }
        setModal(null);
      } catch (e: any) { show(e.message ?? "Error", false); }
    });
  };

  const remove = (id: number) => {
    if (!confirm("Delete this event?")) return;
    startTransition(async () => {
      try { await deleteEvent(id); setEvents(p => p.filter(e => e.id !== id)); show("Event deleted"); }
      catch (e: any) { show(e.message ?? "Error", false); }
    });
  };

  const typeColor: Record<string, string> = {
    Weekly:      "bg-blue-50 text-blue-600",
    Special:     "bg-purple-50 text-purple-600",
    Orientation: "bg-teal-50 text-teal-600",
  };

  return (
    <div>
      {toast && <Toast {...toast} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 text-sm mt-0.5">{events.filter(e => e.status === "upcoming").length} upcoming</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Plus size={15} /> Add Event
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {events.map(ev => (
            <div key={ev.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex flex-col items-center justify-center shrink-0">
                <span className="text-blue-600 font-bold text-sm leading-none">{ev.date.split("-")[2]}</span>
                <span className="text-blue-400 text-[9px] font-medium">
                  {new Date(ev.date + "T00:00:00").toLocaleDateString("en-IN", { month: "short" })}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 text-sm truncate">{ev.title}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColor[ev.type] ?? "bg-gray-100 text-gray-600"}`}>{ev.type}</span>
                </div>
                <p className="text-gray-400 text-xs mt-0.5">{ev.time} · {ev.venue} · {ev.registrations} registrations</p>
              </div>
              <span className={statusPill(ev.status)}>{ev.status}</span>
              <div className="flex items-center gap-1.5">
                <button onClick={() => openEdit(ev)} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"><Edit3 size={13} /></button>
                <button onClick={() => remove(ev.id)} disabled={isPending} className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
          {events.length === 0 && <p className="text-center text-gray-400 text-sm py-10">No events yet.</p>}
        </div>
      </div>

      {modal && (
        <Modal title={modal === "add" ? "Add Event" : "Edit Event"} onClose={() => setModal(null)}>
          <div className="space-y-4">
            <Field label="Event Title"><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Event name" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date"><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} /></Field>
              <Field label="Time"><input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className={inputCls} placeholder="8:30 AM" /></Field>
            </div>
            <Field label="Venue"><input value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} className={inputCls} placeholder="Chennai Chapter" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Type">
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputCls}>
                  <option>Weekly</option><option>Special</option><option>Orientation</option>
                </select>
              </Field>
              <Field label="Status">
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                  <option value="upcoming">Upcoming</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                </select>
              </Field>
            </div>
            <Field label="Registrations"><input type="number" value={form.registrations} onChange={e => setForm({ ...form, registrations: Number(e.target.value) })} className={inputCls} min={0} /></Field>
            <button onClick={save} disabled={isPending} className="w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              <Save size={14} /> {isPending ? "Saving…" : modal === "add" ? "Add Event" : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── GALLERY ───────────────────────────────────────────────────────────────────

function GallerySection({ initialGallery }: { initialGallery: GalleryRow[] }) {
  const [gallery, setGallery] = useState(initialGallery);
  const [modal, setModal] = useState<"add" | null>(null);
  const [form, setForm] = useState({ title: "", category: "Meetings", date: "" });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileData, setFileData] = useState<{ name: string; base64: string; mime: string } | null>(null);
  const [filter, setFilter] = useState("All");
  const [isPending, startTransition] = useTransition();
  const { toast, show } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const cats = ["All", "Meetings", "Events", "Awards", "Networking"];
  const filtered = filter === "All" ? gallery : gallery.filter(g => g.category === filter);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const r = reader.result as string; setFilePreview(r); setFileData({ name: file.name, base64: r.split(",")[1], mime: file.type }); };
    reader.readAsDataURL(file);
  };

  const save = () => {
    startTransition(async () => {
      try {
        let src = "/hero-image.png";
        if (fileData) src = await uploadGalleryImage(fileData.name, fileData.base64, fileData.mime);
        const created = await addGalleryItem({ title: form.title, category: form.category, date: form.date, src });
        setGallery(p => [created, ...p]);
        show("Photo added"); setModal(null); setFilePreview(null); setFileData(null);
      } catch (e: any) { show(e.message ?? "Upload failed", false); }
    });
  };

  const remove = (id: number) => {
    if (!confirm("Delete this photo?")) return;
    startTransition(async () => {
      try { await deleteGalleryItem(id); setGallery(p => p.filter(g => g.id !== id)); show("Photo deleted"); }
      catch (e: any) { show(e.message ?? "Error", false); }
    });
  };

  return (
    <div>
      {toast && <Toast {...toast} />}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-500 text-sm mt-0.5">{gallery.length} photos</p>
        </div>
        <button onClick={() => setModal("add")} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          <Upload size={15} /> Upload Photo
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${filter === c ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map(g => (
          <div key={g.id} className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-100">
            {g.src?.startsWith("http") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={g.src} alt={g.title} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon size={28} className="text-gray-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button onClick={() => remove(g.id)} disabled={isPending} className="bg-white text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5">
                <Trash2 size={11} /> Delete
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2.5">
              <p className="text-white text-xs font-medium truncate">{g.title}</p>
              <p className="text-white/60 text-[10px]">{g.category} · {g.date}</p>
            </div>
          </div>
        ))}
        <button onClick={() => setModal("add")} className="aspect-square bg-white border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Plus size={22} /><span className="text-xs font-semibold">Add Photo</span>
        </button>
      </div>

      {modal && (
        <Modal title="Upload Photo" onClose={() => { setModal(null); setFilePreview(null); setFileData(null); }}>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-xl overflow-hidden cursor-pointer transition-colors" onClick={() => fileRef.current?.click()}>
              {filePreview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={filePreview} alt="preview" className="w-full h-40 object-cover" />
                : <div className="p-8 text-center"><Upload size={24} className="mx-auto text-gray-300 mb-2" /><p className="text-gray-400 text-sm">Click to upload</p><p className="text-gray-300 text-xs mt-1">PNG, JPG up to 10MB</p></div>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <Field label="Title"><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Photo title" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Category">
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                  <option>Meetings</option><option>Events</option><option>Awards</option><option>Networking</option>
                </select>
              </Field>
              <Field label="Date Label"><input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} placeholder="April 2026" /></Field>
            </div>
            <button onClick={save} disabled={isPending} className="w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              <Upload size={14} /> {isPending ? "Uploading…" : "Save Photo"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── ENQUIRIES ─────────────────────────────────────────────────────────────────

function EnquiriesSection({ initialEnquiries }: { initialEnquiries: EnquiryRow[] }) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<EnquiryRow | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast, show } = useToast();

  const filtered = filter === "all" ? enquiries : enquiries.filter(e => e.status === filter);

  const changeStatus = (id: number, status: "new" | "contacted" | "resolved") => {
    startTransition(async () => {
      try {
        await updateEnquiryStatus(id, status);
        setEnquiries(p => p.map(e => e.id === id ? { ...e, status } : e));
        if (selected?.id === id) setSelected(p => p ? { ...p, status } : null);
        show(`Marked as ${status}`);
      } catch (e: any) { show(e.message ?? "Error", false); }
    });
  };

  const remove = (id: number) => {
    if (!confirm("Delete enquiry?")) return;
    startTransition(async () => {
      try { await deleteEnquiry(id); setEnquiries(p => p.filter(e => e.id !== id)); if (selected?.id === id) setSelected(null); show("Deleted"); }
      catch (e: any) { show(e.message ?? "Error", false); }
    });
  };

  return (
    <div>
      {toast && <Toast {...toast} />}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-gray-500 text-sm mt-0.5">{enquiries.filter(e => e.status === "new").length} new · {enquiries.length} total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
        {["all", "new", "contacted", "resolved"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {f} {f !== "all" && `(${enquiries.filter(e => e.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 space-y-2 max-h-[65vh] overflow-y-auto pr-1">
          {filtered.map(e => (
            <button key={e.id} onClick={() => setSelected(e)}
              className={`w-full text-left bg-white border rounded-xl px-4 py-3.5 transition-all hover:shadow-sm ${selected?.id === e.id ? "border-gray-900 ring-1 ring-gray-900/10" : "border-gray-100 hover:border-gray-200"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <span className="text-gray-600 font-semibold text-xs">{e.name[0]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{e.name}</p>
                    <p className="text-xs text-gray-400 truncate">{e.interest}</p>
                  </div>
                </div>
                <span className={statusPill(e.status)}>{e.status}</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && <p className="text-gray-400 text-sm text-center py-8">No enquiries.</p>}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.name}</h2>
                  <p className="text-gray-400 text-sm">{selected.business ?? "—"}</p>
                </div>
                <button onClick={() => remove(selected.id)} disabled={isPending} className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Mail, label: "Email", value: selected.email },
                  { icon: Phone, label: "Phone", value: selected.phone ?? "—" },
                  { icon: Tag, label: "Interest", value: selected.interest },
                  { icon: Calendar, label: "Received", value: new Date(selected.created_at).toLocaleDateString("en-IN") },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3 flex items-start gap-2.5">
                    <item.icon size={13} className="text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-gray-400 text-[10px] uppercase tracking-wide font-medium">{item.label}</p>
                      <p className="text-gray-800 text-xs font-medium break-all">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-400 text-[10px] uppercase tracking-wide font-medium mb-2">Message</p>
                <p className="text-gray-700 text-sm leading-relaxed">{selected.message}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2">Update Status</p>
                <div className="flex gap-2">
                  {(["new", "contacted", "resolved"] as const).map(s => (
                    <button key={s} disabled={isPending} onClick={() => changeStatus(selected.id, s)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all border ${selected.status === s ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center h-64">
              <div className="text-center">
                <MessageSquare size={28} className="mx-auto text-gray-200 mb-2" />
                <p className="text-gray-400 text-sm">Select an enquiry to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────

type Section = "dashboard" | "members" | "events" | "gallery" | "enquiries";

export default function AdminDashboard({ initialMembers, initialEvents, initialGallery, initialEnquiries }: {
  initialMembers: MemberRow[]; initialEvents: EventRow[]; initialGallery: GalleryRow[]; initialEnquiries: EnquiryRow[];
}) {
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [members] = useState(initialMembers);
  const [events] = useState(initialEvents);
  const [gallery] = useState(initialGallery);
  const [enquiries] = useState(initialEnquiries);

  const newEnq = enquiries.filter(e => e.status === "new").length;

  const nav: { id: Section; icon: React.ElementType; label: string; badge?: number }[] = [
    { id: "dashboard", icon: LayoutDashboard, label: "Overview" },
    { id: "members",   icon: Users,           label: "Members",   badge: members.length },
    { id: "events",    icon: Calendar,        label: "Events" },
    { id: "gallery",   icon: ImageIcon,       label: "Gallery" },
    { id: "enquiries", icon: MessageSquare,   label: "Enquiries", badge: newEnq },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-gray-50 ${!sidebarOpen && "justify-center"}`}>
          <div className="w-8 h-8 rounded-xl bg-[#002284] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">B</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-gray-900 font-bold text-sm leading-none">BRO Forum</p>
              <p className="text-gray-400 text-[10px] mt-0.5">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {nav.map(item => (
            <button key={item.id} onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${section === item.id ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"} ${!sidebarOpen && "justify-center"}`}>
              <item.icon size={16} className="shrink-0" />
              {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
              {sidebarOpen && item.badge !== undefined && item.badge > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.id === "enquiries" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className={`px-2 py-3 border-t border-gray-50 space-y-0.5 ${!sidebarOpen && "flex flex-col items-center"}`}>
          {sidebarOpen && (
            <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 text-xs font-medium transition-colors">
              <ArrowUpRight size={15} /> View Website
            </a>
          )}
          <button className={`flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-600 text-xs font-medium transition-colors ${!sidebarOpen && "w-full justify-center"}`}>
            <LogOut size={15} />{sidebarOpen && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="shrink-0 bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
            <Menu size={16} />
          </button>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
              <Bell size={15} />
              {newEnq > 0 && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-white font-semibold text-xs">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {section === "dashboard"  && <Dashboard members={members} events={events} enquiries={enquiries} gallery={gallery} />}
          {section === "members"    && <MembersSection initialMembers={members} />}
          {section === "events"     && <EventsSection initialEvents={events} />}
          {section === "gallery"    && <GallerySection initialGallery={gallery} />}
          {section === "enquiries"  && <EnquiriesSection initialEnquiries={enquiries} />}
        </main>
      </div>
    </div>
  );
}
