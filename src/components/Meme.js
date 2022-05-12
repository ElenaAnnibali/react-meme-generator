import axios from 'axios';
import { useEffect } from 'react';

export default function Meme() {
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('https://api.memegen.link/images/');
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  return (
    <main>
      <form className="form">
        <input type="text" placeholder="Top text" className="form--input" />
        <input type="text" placeholder="Bottom text" className="form--input" />
        <button className="form--button">Get a new meme image</button>
      </form>
    </main>
  );
}
