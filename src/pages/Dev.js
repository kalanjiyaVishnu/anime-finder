import React, { useContext, useEffect } from "react";
import {
  collection,
  doc,
  Firestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserContext } from "../context/userContext";
export default function Dev() {
  
  useEffect(() => {
    
  }, []);
  return (
    <div>
      <h2>developmet component</h2>
    </div>
  );
}
