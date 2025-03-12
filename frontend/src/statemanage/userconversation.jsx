  import { create } from 'zustand'

  const useConversation = create((set) => ({
    selectedconversation:null,
    setselectedconversation: (selectedconversation) => set({selectedconversation}),
    message:[],
    setmessage: (message = []) => set({ message: message || [] }) 
  
  }));
  export default useConversation