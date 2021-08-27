const TopicsEnum = {
  SWITCHRIGHTCARD: 1,
  OPEN_RIGHT_CLICK: 2,
  CANVAS_ADD_LINK: 3,
  CLOSE_TAG_BYID: 4,
  CANVAS_ADD_NODE: 5,
  ADD_SWITCH_TAG: 25,
  CLICK_TAG_SWITCH_DELETE: 26,
  HOVER_TIPS: 27,
  CLOSE_TIPS: 28,
  properties: {
    1: { desc: 'example' },
  },
};

class PubSub {
  topics = {};

  subId = -1;

  subscribe = (topic, func) => {
    const token = (this.subId += 1).toString();
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push({ token, func });
    console.log(
      `subscribe topic:${topic} subId:${token} desc:${TopicsEnum.properties[topic]?.desc}`
    );
    return { topic, token };
  };

  unSubscribe = ({ topic, token }) => {
    if (!topic || !this.topics[topic]) {
      return;
    }
    const idx = this.topics[topic].findIndex((subscription) => subscription.token === token);
    this.topics[topic].splice(idx, 1);
    console.log(
      `ubSubscribe topic:${topic} subId:${token} desc:${TopicsEnum.properties[topic]?.desc}`
    );
  };

  publish = (topic, ...args) =>
    this.topics[topic]?.map((subscription) => subscription.func(...args));
}

const pubSub = new PubSub();

export default pubSub;

export { TopicsEnum };

// const logHandler = msg => console.log(`log:${msg}`);
//
// const subscription1 = pubSub.subscribe('topic1', logHandler);
// const subscription2 = pubSub.subscribe('topic2', logHandler);
//
// pubSub.publish('topic1', 'hello topic1');
// pubSub.publish('topic2', 'hello topic2');
// pubSub.unSubscribe(subscription1);
// pubSub.publish('topic1', 'hello topic1');
// pubSub.publish('topic2', 'hello topic2');
