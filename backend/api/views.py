from django.shortcuts import render

from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# generics.ListCreateAPIView : cette vue a 2 fonctions : 
#       - Lister toutes les notes que le User a créées
#    OU - Créer une new note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # To get all the notes from one user, we 1st need to get access to the request object which specifies the user
        user = self.request.user
        return Note.objects.filter(author=user)

    # specific method for custom need -> Have to overwrite the create method
    #       Cf danjo doc
    # serializer refers to NoteSerializer
    # Ici on exécute la création 
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


# generics.CreateAPIView : Cette classe gère automatiquement les requêtes POST pour créer un nouvel utilisateur
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    # serializer_class -> dit à cette vue quelles data on doit accepter pour créer un new user = unsername + psw
    serializer_class = UserSerializer
    # permission_classes spécifie qui peut appeler cela
    # Ici on va autoriser tout le monde, même s'ils ne sont pas authentifiés à utiliser cette view pour créer un new user
    permission_classes = [AllowAny]