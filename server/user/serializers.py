from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model
from web3 import Web3
import os
from dotenv import load_dotenv

load_dotenv()

INFURA_PROJECT_ID = os.getenv("INFURA_PROJECT_ID")


class RegistrationSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = get_user_model()
        fields = ("first_name", "last_name", "email", "password","ethereum_wallet", "password2")
        extra_kwargs = {
            "password": {"write_only": True},
            "password2": {"write_only": True}
        }

    def save(self):
        user = get_user_model()(
            email=self.validated_data["email"],
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            ethereum_wallet =  self.validated_data["ethereum_wallet"]
        )

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError(
                {"password": "Passwords do not match!"})

        user.set_password(password)
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)


def from_wei(wei):
    return wei / 10**18


class UserSerializer(serializers.ModelSerializer):
    balance = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ("id", "email", "is_staff", "first_name", "last_name", "ethereum_wallet", "balance")

    def get_balance(self, obj):
        infura_url = f"https://mainnet.infura.io/v3/{INFURA_PROJECT_ID}"
        web3 = Web3(Web3.HTTPProvider(infura_url))

        try:
            balance_wei = web3.eth.get_balance(obj.ethereum_wallet)
            balance_ether = from_wei(balance_wei)  # Call fromWei on Web3 directly
            return float(balance_ether)
        except ValueError:
            return "Sorry, your Ethereum address is not valid."
        except Exception as e:
            return f"An error occurred: {str(e)}"
