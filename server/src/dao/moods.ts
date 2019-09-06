import MoodEntry from '../database/models/mood_entries';
import MoodEntryItem from '../database/models/mood_entry_items';

interface APIMoodEntryItem {
  mood: string;
  rating: number;
}

interface MoodEntryResponse {
  [id: number]: {
    createdAt: Date;
    moodEntryItems: APIMoodEntryItem[];
  };
}

export const addMoodEntryForUser = async (
  moodEntries: APIMoodEntryItem[],
  userId: number
): Promise<MoodEntryResponse> => {
  const moodEntry = await MoodEntry.create({
    userId
  });

  const savedMoodItems = await Promise.all(
    moodEntries.map(({ mood, rating }) => {
      return MoodEntryItem.create({
        mood,
        rating,
        userId,
        moodEntryId: moodEntry.id
      });
    })
  );

  return getMoodEntry(userId, moodEntry.id);
};

const presentMoodEntry = (moodEntry: MoodEntry): MoodEntryResponse => {
  return {
    [moodEntry.id]: {
      createdAt: moodEntry.createdAt,
      moodEntryItems: moodEntry.moodEntryItems.sort((a, b) =>
        a.mood > b.mood ? 1 : -1
      )
    }
  };
};

export const getMoodEntry = async (
  userId,
  moodEntryId
): Promise<MoodEntryResponse> => {
  let res = await MoodEntry.findOne({
    include: [
      {
        model: MoodEntryItem,
        attributes: ['mood', 'rating']
      }
    ],
    where: {
      userId,
      id: moodEntryId
    },
    attributes: ['id', 'createdAt']
  });
  return presentMoodEntry(res);
};

export const getMoodEntries = async (
  userId,
  limit = 5
): Promise<MoodEntryResponse> => {
  let res = await MoodEntry.findAll({
    include: [
      {
        model: MoodEntryItem,
        attributes: ['mood', 'rating']
      }
    ],
    where: {
      userId
    },
    limit: 5,
    order: [['id', 'DESC']],
    attributes: ['id', 'createdAt']
  });
  return res.reduce((acc, val) => {
    return { ...acc, ...presentMoodEntry(val) };
  }, {});
};
