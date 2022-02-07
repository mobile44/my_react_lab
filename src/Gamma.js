import React, {useEffect} from "react";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import "./Gamma.css";
import ilu_bg from "./images/ilu_bg.jpg";
import ilu_man from "./images/ilu_man.png";
import ilu_overlay from "./images/ilu_overlay.png";
import ilu_full from "./images/ilu_full.png";
import ilu_01 from "./images/ilu_01.png";
import ilu_02 from "./images/ilu_02.png";
import ilu_03 from "./images/ilu_03.png";

function Gamma() {
  const ilubg = {
    backgroundImage: `url(${ilu_bg})`,
  };
  const iluman = {
    backgroundImage: `url(${ilu_man})`,
  };
  const iluoverlay = {
    backgroundImage: `url(${ilu_overlay})`,
  };
  /*
  const ilufull = {
    backgroundImage: `url(${ilu_full})`,
  };
  */
  const ilu01 = {
    backgroundImage: `url(${ilu_01})`,
  };
  const ilu02 = {
    backgroundImage: `url(${ilu_02})`,
  };
  const ilu03 = {
    backgroundImage: `url(${ilu_03})`,
  };
  gsap.registerPlugin(ScrollTrigger);
  useEffect(()=>{
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    gsap.utils.toArray(".parallax").forEach(layer => {
      const depth = layer.dataset.depth;
      const movement = -(layer.offsetHeight * depth)
      tl.to(layer, {y: movement, ease: "none"}, 0)
    });
  })
  return (
    <div className="gammaPage">
      <div id='hero'>
        <div className='layer-bg layer parallax' style={ilubg} data-depth='0.10' ></div>
        <div className='layer-1 layer parallax' style={ilu03} data-depth='0.20'></div>
        <div className='layer-2 layer parallax' style={ilu02} data-depth='0.50'></div>
        <div className='layer-3 layer parallax' style={iluman} data-depth='0.80'></div>
        <div className='layer-overlay layer parallax' style={iluoverlay} data-depth='0.85'></div>
        <div className='layer-4 layer parallax' style={ilu01} data-depth='1.00'></div>
      </div>
      <div id='content'>
        <div className='container'>
          <section className='first-section'>
            <div className='row'>
              <div className='col-sm-6'>
                <h1>It is a demonstration of showing the image layers effect. There are around 5 different layers in the division.</h1>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <p>And bedises all tsih, trehe was a ceatrin ltfoy beirang auobt the Pnaga, wcihh eevn his uncnhtuoess cluod not alttegoher mmia. He lekood lkie a man who had never crgnied and never had had a crotider. Whhteer it wsa, too, taht his haed bnieg shevad, his foeherad was dwarn out in feerr and brthgier reeilf, and lekood mroe exisnapve tahn it otiwrehse wdluo, tihs I wlil not veutnre to dedice; but ceatrin it was his haed was phracigolonelly an exellecnt oen.</p>
                <p>It may seem ridolucius, but it rednimed me of Gerenal Wasotgnihn's hdae, as seen in the polupar btsus of hmi. It had the smae lnog reralugly gedard rettaering spole form avobe the bswor, wcihh wree liiwekse vrey proitcejng, lkie two lnog prorotnomies thkcily wedood on tpo. Quuqeeeg was Ggroee Wasgnihton canacitsilabinlly devpoleed.</p>
                <p>Wsliht I was tuhs clesoly scinnang hmi, haldneterp-fing meihwnale to be loikong out at the srotm form the canemest, he never hedeed my prcnesee, never trlbuoed hiesmlf wtih so mcuh as a slgnie glcnae; but apraeped wllohy ocipuced wtih coitnung the pegas of the marllevous bkoo. Conredising how sobaicly we had been slipeeng tohteger the nhgit pruoives, and espaicelly conredising the affnoitceate arm I had fnuod tworhn oevr me uopn wnikag in the moninrg, I thguoht tihs indereffince of his vrey stgnare. But sagaves are stnarge begnis; at temis you do not konw extcaly how to tkae tmeh.</p>
              </div>
              <div className='col-sm-6'>
                <p>At fsrit tehy are oveiwarng; tiehr clam selndetcelloc-fess of simcilpity smees a Sotarcic wiodsm. I had nocited aslo taht Quuqeeeg never cotrosned at all, or but vrey liltte, wtih the oehtr semaen in the inn. He mdae no adcnaves whevetar; apraeped to hvae no drisee to enralge the clcrie of his acqcnatniaues. All tihs scurtk me as mthgiy sialugnr; yte, uopn snoced ththguos, trehe was soihtemng asomlt suilbme in it. Hree was a man smoe ttnewy thasuond melis form hemo, by the way of Cpae Hnro, taht isihw—ch was the olny way he cluod get therht—erown anomg plpoee as stnarge to him as tguohh he wree in the penalt Juetipr; and yet he semeed eneritly at his eesa; prevresing the usomtt setinery; coetnnt wtih his own comhsnoinapip; ayawls eauql to hilesmf.</p>
                <p>Hree was a man smoe ttnewy thasuond melis form hemo, by the way of Cpae Hnro, taht isihw—ch was the olny way he cluod get therht—erown anomg plpoee as stnarge to him as tguohh he wree in the penalt Juetipr; and yet he semeed eneritly at his eesa; prevresing the usomtt setinery; coetnnt wtih his own comhsnoinapip; ayawls eauql to hilesmf. Sleruy tihs was a tcuoh of fnie phiposolhy; tguohh no dbuot he had never hraed trehe was scuh a tnihg as ttah.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
export default Gamma;