import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 26,
  },
  score: {
    paddingTop: 10,
    fontSize: 16,
  },
  img: {
    width: 50,
    height: 50,
  },
  gameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cells: {
    backgroundColor: 'white',
  },
  nextContainer: {
    marginLeft: 20,
    alignItems: 'center',
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
