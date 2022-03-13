import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'

export default {
  userActions1: [
    {
      id: 1,
      icon: HomeIcon,
      text: 'Home',
    },
    {
      id: 2,
      icon: SearchIcon,
      text: 'Search',
    },
    {
      id: 3,
      icon: LibraryIcon,
      text: 'Your library',
    },
  ],
  userActions2: [
    {
      id: 4,
      icon: PlusCircleIcon,
      text: 'Create playlist',
    },
    {
      id: 5,
      icon: HeartIcon,
      text: 'Liked songs',
    },
    {
      id: 6,
      icon: RssIcon,
      text: 'Your episodes',
    },
  ],
}
