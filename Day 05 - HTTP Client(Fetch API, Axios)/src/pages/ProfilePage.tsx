import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../hooks/useAuth";
import { getApiError, imageApi, profileApi } from "../services/api";

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [roleTitle, setRoleTitle] = useState(user?.roleTitle ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function save(event: FormEvent) {
    event.preventDefault(); setMessage("");
    try {
      const result = (await profileApi.update({ displayName, roleTitle, bio })).data.result;
      if (user) updateUser({ ...user, displayName: result.displayName, roleTitle: result.roleTitle ?? "", bio: result.bio });
      setMessage("Đã lưu thông tin.");
    } catch (e) { setMessage(getApiError(e)); }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) { setMessage("Ảnh không hợp lệ hoặc vượt quá 5 MB."); return; }
    try {
      const image = (await imageApi.upload(file)).data.result;
      if (user) updateUser({ ...user, avatarUrl: image.url, avatarPublicId: image.publicId });
      setMessage("Đã cập nhật ảnh.");
    } catch (e) { setMessage(getApiError(e)); }
  }

  async function removeAvatar() {
    if (!user?.avatarPublicId) return;
    try { await imageApi.remove(user.avatarPublicId); updateUser({ ...user, avatarUrl: undefined, avatarPublicId: undefined }); setMessage("Đã xóa ảnh."); }
    catch (e) { setMessage(getApiError(e)); }
  }

  return <AppLayout title="Profile">
    <section className="card profile-photo"><div className="avatar large">{user?.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" /> : user?.displayName.slice(0, 2).toUpperCase()}</div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={upload} />
      <button className="primary" onClick={() => inputRef.current?.click()}>Upload photo</button>
      {user?.avatarPublicId && <button className="secondary" onClick={removeAvatar}>Remove</button>}
    </section>
    <form className="card profile-form" onSubmit={save}>
      <label>Full name<input value={displayName} onChange={e => setDisplayName(e.target.value)} required /></label>
      <label>Email<input value={user?.email ?? ""} disabled /></label>
      <label>Role / Title<input value={roleTitle} onChange={e => setRoleTitle(e.target.value)} /></label>
      <label>Bio<textarea value={bio} onChange={e => setBio(e.target.value)} rows={5} /></label>
      {message && <p>{message}</p>}<button className="primary">Save changes</button>
    </form>
  </AppLayout>;
}
