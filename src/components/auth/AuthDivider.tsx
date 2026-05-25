// src/components/auth/AuthDivider.tsx
// CINEVISION AI — AUTH DIVIDER

export function AuthDivider({ text = 'ou' }: { text?: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-[#050507] text-gray-500">{text}</span>
      </div>
    </div>
  );
}

export default AuthDivider;
