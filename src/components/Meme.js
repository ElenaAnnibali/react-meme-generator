import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';

export default function Meme() {
  const [memeData, setMemeData] = useState([]);
  const [customUrl, setCustomUrl] = useState(
    `https://api.memegen.link/images/cheems/it's_a_good_time_to_sleep/nothing_will_go_wrong_after_this.jpg?watermark=memecomplete.com&token=autrpyouplvqnc6pp7b5`,
  );
  const [imgStyle, setImgStyle] = useState('');
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.memegen.link/templates');
        const json = await response.json();
        setMemeData(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // url changes
  const changedTopText = topText
    .replace(/\?/g, '~q')
    .replace(/%/g, '~p')
    .replace(/\//g, '~s')
    .replace(/#/g, '~h')
    .replace(/"/g, "''")
    .replace(/_/g, '__')
    .replace(/-/g, '--');

  const changedBottomText = bottomText
    .replace(/\?/g, '~q')
    .replace(/%/g, '~p')
    .replace(/\//g, '~s')
    .replace(/#/g, '~h')
    .replace(/"/g, "''")
    .replace(/_/g, '__')
    .replace(/-/g, '--');

  // function generating the img when button create a new meme clicked
  const onNewGenerate = () => {
    setCustomUrl(
      `https://api.memegen.link/images/${imgStyle}/${changedTopText}/${changedBottomText}.jpg`,
    );
  };

  return (
    <main>
      <form className="form">
        <input
          onChange={(event) => setTopText(event.currentTarget.formTarget.value)}
          type="text"
          placeholder="Top text"
          className="form--input"
        />
        <Input
          onChange={(event) =>
            setBottomText(event.currentTarget.formTarget.value)
          }
          type="text"
          placeholder="Bottom text"
          className="form--input"
        />
        <div>
          <label>
            <select
              id="imageStyle"
              placeholder="your meme"
              value={imgStyle}
              onChange={(event) => setImgStyle(event.currentTarget.value)}
            >
              {memeData.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <Button click={onNewGenerate} className="form--button">
          Get a new meme image
        </Button>
        <Button
          onClick={() => {
            saveAs(customUrl, `${imgStyle}-${topText}-${bottomText}.jpg`);
          }}
        >
          Download your fresh new meme
        </Button>
        <Button
          onClick={() => {
            setTopText('');
            setBottomText('');
          }}
        >
          Once again!
        </Button>
      </form>
      <br />
      <br />
      <br />
      <img src={customUrl} alt="meme" />
    </main>
  );
}
