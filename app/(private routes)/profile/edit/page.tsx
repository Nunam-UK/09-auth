'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const [username, setUsername] = useState(user?.username || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const updatedUser = await updateMe({ username });
      setUser(updatedUser);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Помилка при оновленні профілю');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image 
          src={user.avatar} 
          alt="User Avatar" 
          width={120} 
          height={120} 
          className={css.avatar} 
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input 
              id="username"
              type="text" 
              className={css.input} 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button 
              type="submit" 
              className={css.saveButton} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button" 
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}