from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
# Ca dit à Django , que l'on veut accepter le psw quand on crée un new user
# ? mais on ne veut pas retourner le psw quand on donne de info au sujet du user
# write_only signifie que personne ne peut lire ce qu'est le psw
        extra_kwargs = {"password": {"write_only": True}}

# Méthode appelée quand on veut créer une nouvelle version de "User"
# Le serializer va regarder tous les champs du model = User
#       il va s'assurer qu'ils sont valides. Si OK, il va passer les data dans "validated_data"
# Après c'est à nous de décider ce que l'on veut en faire -> ici on décide de créer un user
    def create(self, validated_data):
            print(validated_data)
            user = User.objects.create_user(**validated_data)
            return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}