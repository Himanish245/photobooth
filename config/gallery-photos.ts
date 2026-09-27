export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  date: string;
  rotation: number; // degrees, between -5 and 5
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "1",
    src: "/gallery/photo-1.jpg",
    caption: "Our first adventure",
    date: "Jan 2024",
    rotation: -3,
  },
  {
    id: "2",
    src: "/gallery/photo-2.jpg",
    caption: "Sunday morning smiles",
    date: "Feb 2024",
    rotation: 2,
  },
  {
    id: "3",
    src: "/gallery/photo-3.jpg",
    caption: "That golden sunset",
    date: "Mar 2024",
    rotation: -1,
  },
  {
    id: "4",
    src: "/gallery/photo-4.jpg",
    caption: "Coffee & laughter",
    date: "Apr 2024",
    rotation: 4,
  },
  {
    id: "5",
    src: "/gallery/photo-5.jpg",
    caption: "Dancing in the rain",
    date: "May 2024",
    rotation: -2,
  },
  {
    id: "6",
    src: "/gallery/photo-6.jpg",
    caption: "Our little paradise",
    date: "Jun 2024",
    rotation: 3,
  },
  {
    id: "7",
    src: "/gallery/photo-7.jpg",
    caption: "Starlit conversations",
    date: "Jul 2024",
    rotation: -4,
  },
  {
    id: "8",
    src: "/gallery/photo-8.jpg",
    caption: "Forever & always",
    date: "Aug 2024",
    rotation: 1,
  },
];
