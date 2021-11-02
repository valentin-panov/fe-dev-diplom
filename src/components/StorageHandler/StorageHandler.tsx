import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { storageHandlerAdapter } from 'src/packages/storage/adapters/StorageHandlerAdapter';
import { experienceSet } from 'src/store/experience';

export type Props = {
  className?: string;
  children?: never;
};

export const StorageHandler = memo<Props>(() => {
  const { experience } = useSelector((store: RootState) => store);
  const dispatch = useDispatch();

  const mounted = useRef<boolean>(false);

  useEffect(() => {
    // Если монтирование
    if (!mounted.current) {
      mounted.current = true; // Отмечаем, что монтирование было

      // данные из локального стора помещаем в стэйт менеджер
      storageHandlerAdapter.get().then((data) => {
        if (!data) return;
        if (data.experience) dispatch(experienceSet(data.experience));
      });
    } else {
      storageHandlerAdapter.set({ experience });
    }
  }, [dispatch, experience]);

  return null;
});
