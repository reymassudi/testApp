import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Slider from '@/components/Slider';
import { get_locale } from '@/utils/server-functions';

import SliderImg from '@/public/img/auth/slider-1.png';
import './auth-slider.scss';

function SliderContent({ item, index, isRTL }) {
  const { title, subTitle, sliderClass } = item;

  return (
    <div className="relative auth-slider">
      <Image
        src={SliderImg?.src}
        alt="slider"
        height={80}
        width={94}
        priority={index === 0}
      />
      <h4 className="mt-6 mb-2">{title}</h4>
      <p className={`text-gray-800${isRTL ? ' body-2' : ' body-1'}`}>
        {subTitle}
      </p>

      <div className={`blur-bg auth-slider-bg ${sliderClass}`}>
        <div>
          <div className="ellipse-yellow circle-lg" />
          <div className="ellipse-yellow circle-md" />
          <div className="ellipse-green" />
        </div>
      </div>
    </div>
  );
}

export default async function AuthSlider() {
  const t = await getTranslations();
  const isRTL = (await get_locale())?.rtl;

  const data = [
    {
      title: t('statics.auth-slider.1.title'),
      subTitle: t('statics.auth-slider.1.subTitle'),
      sliderClass: 'slider-bg-1',
    },
    {
      title: t('statics.auth-slider.2.title'),
      subTitle: t('statics.auth-slider.2.subTitle'),
      sliderClass: 'slider-bg-2',
    },
    {
      title: t('statics.auth-slider.3.title'),
      subTitle: t('statics.auth-slider.3.subTitle'),
      sliderClass: 'slider-bg-3',
    },
  ];

  const slides = data.map((item, index) => {
    return (
      <SliderContent key={item.id} item={item} isRTL={isRTL} index={index} />
    );
  });

  return <Slider slides={slides} isRTL={isRTL} />;
}
