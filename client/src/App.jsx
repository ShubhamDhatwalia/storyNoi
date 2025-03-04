
import './App.css';
import bannerbg from "./assets/banner-section-bg.png";
import Navigation from './components/navigation';
import star from "./assets/star.png";
import bannerimg from "./assets/banner-image.png";
import aboutimg from "./assets/aboutimg.png";
import storyNoiimg from "./assets/storyNoiimg.png";
import whystory from "./assets/whystoryNoi-image.png";

function App() {


  return (
    <>

      <div className="bg-[url('./assets/banner-section-bg.png')] bg-cover bg-no-repeat bg-center  w-full">

        <Navigation />

        <section id='hero-section' className="container hero-section pt-[200px] pb-[100px] flex items-center">
          <div className="content flex-1/2 mt-[75px]">

            <h1 className=''>Let Gen - AI Turn Your Idea to a  <span className='text-[#FF8E00]'>kid’s Book!</span></h1>
            <h2 className='mt-[59px]'>Express your idea in a few words!</h2>
            <form className="input-group max-w-[646px] relative mt-[33px]">
              <input type="text" placeholder='Share your idea to start the book creation' className='bg-white rounded-[20px] w-full  py-[33px] pl-[30px] pr-[220px] focus:outline-none  ' />
              <button type='submit' className=' btn py-[24px] px-[41px] bg-[#FF8E00] rounded-[12px] absolute right-[9px] top-[10px] !text-white'> create Story</button>
            </form>

            <div className='flex gap-[113px] mt-[96px]'>

              <div >
                <h6>Downloads</h6>
                <h1>12 000</h1>
              </div>

              <div>
                <h6>Assessment</h6>
                <h1 className='flex items-center gap-[6px]'>4.8 <img src={star} alt="" /> </h1>
              </div>

            </div>
          </div>
          <div className="image flex-1/2">

            <img src={bannerimg} alt="" />
          </div>
        </section>




      </div>



      <section id='about' className="bg-[url('./assets/aboutbg.png')] py-[120px] bg-no-repeat bg-cover bg-center">

        <div className='container'>

          <h2>About Us</h2>
          <h1>The Perfect Storyteller</h1>

          <div className='mt-[36px] flex items-center gap-[90px]'>
            <div className='w-1/2'>
              <img src={aboutimg} alt="" className='w-[100%] h-auto ' />
            </div>

            <div className='w-1/2 flex flex-col gap-[45px] max-w-[655px]' >
              <p>
                Is A Genai Powered App That Lets You Create And Share Your Own Stories. With The Help Of Genai, The App Can Generate Stories Based On Your Prompts And Ideas. You Can Then Turn Your Stories Into Books.
              </p>
              <p>Once You've Created A Story, You Can Share It With Friends And Family Through The App's Social Media Integration.</p>
              <p>You Can Also Publish Your Stories Online Through The App's Publishing Pla tform.</p>
            </div>
          </div>

        </div>
      </section>

      <section id="storyNoi" className="bg-[url('./assets/storyNoibg.png')] bg-no-repeat bg-cover bg-center py-[120px] relative">

        <div className="container flex gap-[100px]">
          <div className='w-1/2 '>
            <h2>All One Needs Is An Idea!</h2>
            <h1>AI Personalized Stories</h1>

            <p className='pt-[40px] max-w-[655px]'>All You Need To Do Is Start By Giving The App A Few Prompts. These Prompts Can Be Anything From A Simple Setting To A Complex Character. Once You've Given The App Some Prompts, It Will Start Generating A Story. You Can Then Follow Along As The Story Unfolds, Or You Can Even Take Control Of The Story And Make Your Own Choices.</p>

            <p className='pt-[45px] max-w-[655px]'>You Can Create Stories About Anything You Can Imagine. You Can Create Stories About Your Favorite Characters, Your Favorite Places, Or Even Your Own Lif.</p>

          </div>

          <div className='w-1/2'>

            <img src={storyNoiimg} alt="" className=' absolute top-0 right-0' />

          </div>
        </div>
      </section>


      <section id='whystoryNoi' className="bg-[url('./assets/whystoryNoi-bg.png')]  bg-no-repeat bg-cover bg-center py-[120px] ">
        <div className='container flex gap-[80px]'>
          <div className='w-1/2'>
            <img src={whystory} alt="" />
          </div>

          <div className="w-1/2">
            <h2>Why</h2>
            <h1>StoryNoi</h1>

            <p className='mt-[40px]'>Create Stories About Anything You Can Imagine. Create & Share Your Stories With Friends And Family Through Social Media. Publish Your Stories Online Or Turn Your Stories Into Books. It Is The Perfect Tool For Anyone Who Loves To Create Stories. It's Easy To Use, Affordable, And Fun. So What Are You Waiting For? Start Creating Your Own Stories Today!</p>

            <p className='!font-bold mt-[45px]'>Here Are Some Additional Benefits Of Using Storynoi:</p>
          </div>
        </div>
      </section>

    </>
  )
}

export default App
