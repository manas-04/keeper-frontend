import React, { useState,useEffect } from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  async function getData() {
    axios.get(`https://anywhere-notes.herokuapp.com/getData`)
    .then((res)=>{
      setNotes(res.data.array);
    }).catch(error => {
      console.log(error);
    })
  }

  async function addNote(newNote) {
    setNotes(prevNotes => {
       axios.post(`https://anywhere-notes.herokuapp.com/updateElement`,{
        noteArray: [...prevNotes, newNote]
      }).catch(error => {
        console.log(error);
      })
      // console.log([...prevNotes, newNote]);
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      const updatedArray =  prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
      axios.post(`https://anywhere-notes.herokuapp.com/updateElement`,{
        noteArray: updatedArray
      }).catch(error => {
        console.log(error);
      })
      // console.log(updatedArray);
      return updatedArray;
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
