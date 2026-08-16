"use client";

import { useState } from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

// Optional: set these in .env.local to deep-link the Google/GitHub buttons straight to a
// specific Kinde social connection (Kinde dashboard → Settings → Authentication → Social sign-in
// → copy the connection's ID). Without them, the buttons still work — they just land on Kinde's
// hosted login page where the visitor picks a provider there instead.
const GOOGLE_CONNECTION_ID = process.env.NEXT_PUBLIC_KINDE_GOOGLE_CONNECTION_ID;
const GITHUB_CONNECTION_ID = process.env.NEXT_PUBLIC_KINDE_GITHUB_CONNECTION_ID;

const inputClass =
  "w-full border-2 border-black rounded-xl px-3 py-2.5 shadow-[2px_3px_0_0_rgba(0,0,0,1)] text-[15px] bg-white";

export default function AuthCard() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const isSignin = mode === "signin";

  // Credentials are actually verified on Kinde's hosted page (this app never sees a password).
  // We just forward whatever email was typed here as a hint so it's pre-filled over there.
  const authUrlParams = email.trim() ? { login_hint: email.trim() } : undefined;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="bg-white border-2 border-black rounded-[24px] shadow-[4px_6px_0_0_rgba(0,0,0,1)] px-9 py-10 w-[400px] max-w-full">
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-10 h-10 bg-black text-white rounded-[10px] flex items-center justify-center font-bold text-lg">
            K
          </div>
          <span className="font-bold text-xl">Kirat</span>
        </div>

        <div className="flex bg-[#f6f6f6] border-2 border-black rounded-full p-1 mb-6">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className="flex-1 text-center py-2 rounded-full font-semibold text-sm cursor-pointer transition-colors"
            style={{ background: isSignin ? "#000000" : "transparent", color: isSignin ? "#ffffff" : "#000000" }}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="flex-1 text-center py-2 rounded-full font-semibold text-sm cursor-pointer transition-colors"
            style={{ background: !isSignin ? "#000000" : "transparent", color: !isSignin ? "#ffffff" : "#000000" }}
          >
            Create account
          </button>
        </div>

        <div className="mb-3.5">
          <label className="block mb-1.5 text-[13px] text-[#444444]">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="mb-1.5">
          <label className="block mb-1.5 text-[13px] text-[#444444]">Password</label>
          <input type="password" placeholder="••••••••" className={inputClass} disabled />
        </div>
        <p className="text-xs text-[#999999] mb-1">
          Password is entered on Kinde&apos;s secure sign-in page after you continue.
        </p>

        {isSignin && (
          <div className="text-right mb-4">
            <LoginLink authUrlParams={authUrlParams} className="text-[13px] text-[#5594f1] cursor-pointer">
              Forgot password?
            </LoginLink>
          </div>
        )}

        {isSignin ? (
          <LoginLink
            authUrlParams={authUrlParams}
            className="block w-full text-center bg-[#5594f1] text-white font-bold text-[15px] py-3 rounded-full border-2 border-black shadow-[2px_4px_0_0_rgba(0,0,0,1)] cursor-pointer"
          >
            Sign in
          </LoginLink>
        ) : (
          <RegisterLink
            authUrlParams={authUrlParams}
            className="block w-full text-center bg-[#5594f1] text-white font-bold text-[15px] py-3 rounded-full border-2 border-black shadow-[2px_4px_0_0_rgba(0,0,0,1)] cursor-pointer"
          >
            Create account
          </RegisterLink>
        )}

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#dddddd]" />
          <span className="text-xs text-[#909090] whitespace-nowrap">or continue with</span>
          <div className="flex-1 h-px bg-[#dddddd]" />
        </div>

        <div className="flex gap-2.5 mb-5">
          <LoginLink
            authUrlParams={GOOGLE_CONNECTION_ID ? { connection_id: GOOGLE_CONNECTION_ID } : undefined}
            className="flex-1 text-center border-2 border-black rounded-xl py-2.5 bg-white font-semibold text-sm cursor-pointer shadow-[2px_3px_0_0_rgba(0,0,0,1)]"
          >
            Google
          </LoginLink>
          <LoginLink
            authUrlParams={GITHUB_CONNECTION_ID ? { connection_id: GITHUB_CONNECTION_ID } : undefined}
            className="flex-1 text-center border-2 border-black rounded-xl py-2.5 bg-white font-semibold text-sm cursor-pointer shadow-[2px_3px_0_0_rgba(0,0,0,1)]"
          >
            GitHub
          </LoginLink>
        </div>

        <div className="text-center text-sm text-[#666666]">
          {isSignin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(isSignin ? "signup" : "signin")}
            className="text-[#5594f1] font-semibold cursor-pointer bg-transparent border-none p-0"
          >
            {isSignin ? "Create one" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
