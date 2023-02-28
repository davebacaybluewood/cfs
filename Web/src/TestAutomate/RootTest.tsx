import React from "react";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Test from "./Test";

const RootTest = () => {
  const supabase = createClient(
    "https://fhuzpdlobwyixkehfylu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZodXpwZGxvYnd5aXhrZWhmeWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzczNzc4MTYsImV4cCI6MTk5Mjk1MzgxNn0.4k3Tc-EywtLAT9vGLwFepwCwnoPtcRqWxSllTx8CvS4"
  );

  return (
    <div>
      <SessionContextProvider supabaseClient={supabase}>
        <Test />
      </SessionContextProvider>
    </div>
  );
};

export default RootTest;
