import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Animated, Image, useWindowDimensions } from "react-native";

import { View } from "@/components/Themed";
import { useEffect, useRef, useState } from "react";

const iconColor = "rgba(255,255,255,.7)";

export default function ModalScreen() {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flex: 1, padding: 15 }}>
      <View style={{ paddingLeft: width * 0.15 }}>
        <Image
          source={require("../assets/images/arda.jpeg")}
          style={{ width: "100%", height: width * 1.1, borderRadius: 10 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <XCounter iconComponent={EvilIcons} iconName="comment" count={2000} />
          <XCounter iconComponent={EvilIcons} iconName="retweet" count={100} />
          <XCounter iconComponent={EvilIcons} iconName="heart" count={10000} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Fontisto size={18} name="favorite" color={iconColor} />
            <View style={{ marginHorizontal: 10 }} />
            <Feather size={18} name="upload" color={iconColor} />
          </View>
        </View>
      </View>
    </View>
  );
}

type XCounterProps = {
  count: number;
  iconComponent: any;
  iconName: string;
};
function XCounter({ count, iconComponent: Icon, iconName }: XCounterProps) {
  const [val, setVal] = useState(count);
  useEffect(() => {
    const random = (Math.random() % 10000) * 10000;
    setInterval(() => {
      setVal((old) => old + 1000);
    }, random);
  }, []);
  let text = `${val}`;
  if (val > 1000000) {
    text = `${(val / 1000000).toFixed(2)}M`;
  }
  if (val > 1000) {
    text = `${(val / 1000).toFixed(2)}K`;
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Icon size={24} name={iconName} color={iconColor} />
      <CounterText text={text} />
    </View>
  );
}

type CounterTextProps = {
  text: string;
};
function CounterText({ text }: CounterTextProps) {
  const [oldText, setOldText] = useState(text);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 400,
    }).start(() => {
      setOldText(text);
      setTimeout(() => animation.setValue(0), 100);
    });
  }, [text]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -24],
    extrapolate: "clamp",
  });
  const translateY2 = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, -12],
    extrapolate: "clamp",
  });

  return (
    <View
      style={{
        marginLeft: 2,
        position: "relative",
        height: 16,
        overflow: "hidden",
      }}
    >
      <Animated.Text
        style={{
          fontSize: 12,
          color: iconColor,
          transform: [{ translateY }],
        }}
      >
        {oldText}
      </Animated.Text>
      <Animated.Text
        style={{
          fontSize: 12,
          color: iconColor,
          transform: [{ translateY: translateY2 }],
        }}
      >
        {text}
      </Animated.Text>
    </View>
  );
}
