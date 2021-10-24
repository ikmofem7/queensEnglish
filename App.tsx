import axios from 'axios';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import BoldText from './Components/BoldText';
import Button from './Components/Button';
import AppColor from './Util/AppColor';

export type Props = {
  question: object;
  output?: string;
  status: Boolean;
  loader: Boolean;
  successModal: Boolean;
};

const Hello: React.FC<Props> = ({
  question = {},
  output = '',
  status = false,
  loader = false,
  successModal = false,
}) => {
  const [triviaQuestion, setTriviaQuestion] = useState(question);
  const [answer, setAnswer] = useState(output);
  const [answerStatus, setAnswerStaus] = useState(status);
  const [loading, setLoading] = useState(loader);
  const [modalStatus, setModalStatus] = useState(successModal);
  useEffect(() => {
    fetchQuestion();
  }, []);
  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jservice.io/api/random');
      if (response.data) {
        setTriviaQuestion(response.data[0]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Something went wrong!!');
    }
  };

  const submitAnswer = () => {
    if (['', null, undefined].includes(answer))
      return Alert.alert('Alert', 'Enter valid answer');
    setAnswerStaus(
      answer.toLowerCase() === triviaQuestion.answer.toLowerCase(),
    );
    setModalStatus(true);
  };

  const closePopUp = () => {
    setModalStatus(false);
    fetchQuestion();
    setAnswer('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!loading ? (
        <Fragment>
          <BoldText text="Trivia Question" style={styles.title} />
          {triviaQuestion && (
            <View>
              <Text style={{fontSize: 16, fontStyle: 'italic'}}>
                {triviaQuestion.question}
              </Text>
              <TextInput
                style={styles.input}
                value={answer}
                onChangeText={text => setAnswer(text)}
                placeholder="Enter your answer"
                placeholderTextColor="black"
                maxLength={50}
              />
              <Button title="Submit" pressAction={() => submitAnswer()} />
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalStatus}>
                <View style={styles.backDrop}>
                  <View style={styles.mainContainer}>
                    <Image
                      source={
                        answerStatus
                          ? require('./Icons/Success.png')
                          : require('./Icons/Failure.png')
                      }
                    />
                    {answerStatus && (
                      <BoldText
                        text="Congratulation"
                        style={{marginVetical: 20}}
                      />
                    )}
                    <Text>Correct Answer: {triviaQuestion.answer}</Text>
                    <View style={{width: '100%', marginVertical: 20}}>
                      <Button
                        title="Next Question"
                        pressAction={() => closePopUp()}
                      />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </Fragment>
      ) : (
        <ActivityIndicator color={AppColor.primary} size="large" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: AppColor.primary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: AppColor.primary,
    color: 'black',
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  backDrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.30)',
    justifyContent: 'flex-end',
  },
  mainContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Hello;
