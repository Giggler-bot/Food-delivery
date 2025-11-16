import { SafeAreaView } from "react-native-safe-area-context";
import { images, offers } from "@/constants";
import { View, Text,  FlatList, Pressable, Image, TouchableOpacity, Button } from "react-native";
import { Fragment } from "react";
import cn from "clsx";

import CartButton from "@/components/CartButton";

import * as Sentry from "@sentry/react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList 
        data={offers}
        renderItem={({ item, index }) => {
          const isEven: boolean = index % 2 === 0;
          return (
            <View>
              <Pressable className={cn("offer-card", isEven ? 'flex-row-reverse' : 'flex-row')}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: '#fff'}}
              >
               {({ pressed }) => (
                <Fragment>
                  <View className="w-1/2">
                    <Image source={item.image} className={"size-full"} resizeMode={"contain"}/>
                  </View>
                  <View className={cn("offer-card__info", isEven ? 'pl-10' : 'pr-10')}>
                    <Text className="text-white h1-bold leading-tight">{item.title}</Text>
                    <Image 
                      source={images.arrowRight}
                      className="size-10"
                      tintColor="#ffffff"
                      resizeMode="contain"
                    />
                  </View>
                </Fragment>
               )}
              </Pressable>
              
            </View>
          );
        }}
        contentContainerClassName="px-5 pb-24"
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Ghana</Text>
                <Image source={images.arrowDown} className="size-3" resizeMode="contain"/>
              </TouchableOpacity>
            </View>

            <CartButton />
          </View>
        )}
        ListFooterComponent={() => (
          <Button title='Try!' onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
        )}
      />
    </SafeAreaView>
  );
}