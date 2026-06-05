// PhotoGrid.tsx
type Photo = {
  id: number
  src: string
  alt: string
}

type Props = {
  photos: Photo[] // minimal 4 foto
}

export default function PhotoGrid({ photos }: Props) {
  const [large, topRight, botLeft, botRight] = photos

  return (

    <div className="grid grid-cols-2 grid-rows-[200px_140px] gap-2">
        
      {/* Foto besar kiri — span 2 baris */}
      <div className="row-span-2 rounded-xl overflow-hidden">
        <img src={large.src} alt={large.alt} className="w-full h-full object-cover" />
      </div>

      {/* Foto medium kanan atas */}
      <div className="rounded-xl overflow-hidden">
        <img src={topRight.src} alt={topRight.alt} className="w-full h-full object-cover" />
      
      </div>

      {/* Dua foto kecil kanan bawah */}
      <div className="grid grid-cols-2 gap-2">

        <div className="rounded-xl overflow-hidden">
          <img src={botLeft.src} alt={botLeft.alt} className="w-full h-full object-cover" />
        </div>
      
        <div className="rounded-xl overflow-hidden">
          <img src={botRight.src} alt={botRight.alt} className="w-full h-full object-cover" />
        </div>
      
      </div>
    </div>
  )
}